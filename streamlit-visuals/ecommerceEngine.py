


import pandas as pd
import numpy as np
from scipy.sparse import coo_matrix
from sklearn.metrics.pairwise import cosine_similarity
from bs4 import BeautifulSoup
from PIL import Image
import requests
from io import BytesIO
import IPython.display as Disp


INTERACTIONS_FILE = "dist-data/iterations.csv"
FILE_PRODUCT_MAPPINGS = 'data/product_mappings.csv'


ROW_USER_ID = 'user_id'
ROW_USER = 'user'
ROW_PRODUCT_ID = 'product_id'
ROW_USER_SESSION = 'user_session'
ROW_PRODUCT_ID = 'product_id'
ROW_EVENT_TYPE = 'event_type'
ROW_SCORE = "score"
ROW_ID = 'row_id'

ROW_USER_INDEX = 'user_index'
ROW_PRODUCT_INDEX = 'product_index'

ROW_CATEGORY_CODE = "category_code"
ROW_BRAND = "brand"
ROW_NAME="product_name"
ROW_PRODUCT_ID = "product_id"
ROW_COUNT = "count"
ROW_EVENT = "event_type"
ROW_TIME = "event_time"
ROW_SESSION = "user_session"

from enum import Enum

def create_name(dfrow):
    return returnSpaceForNan(dfrow[ROW_CATEGORY_CODE]) + " "+ returnSpaceForNan(dfrow[ROW_BRAND])

def returnSpaceForNan(field):
    return field if field != "nan" else ""




class EDataframe(Enum):
    INTERACTIONDF = 'interactionDF'
    PRODUCTMAPPING = 'productMapping'
    INTERACTIONS = 'interactions'

class RecommenderEngine():
    def __init__(self, ownHistory: pd.core.frame.DataFrame, INTERACTIONS_FILEIn:str = INTERACTIONS_FILE, FILE_PRODUCT_MAPPINGSIn:str = FILE_PRODUCT_MAPPINGS):
        self.INTERACTIONS_FILE = INTERACTIONS_FILEIn
        self.FILE_PRODUCT_MAPPINGS = FILE_PRODUCT_MAPPINGSIn
        self.interactionDF = pd.read_csv(INTERACTIONS_FILEIn, index_col=0)
        self.productMapping = pd.read_csv(FILE_PRODUCT_MAPPINGS, index_col=0)
        self.ownHistory = ownHistory
        self.interactions = pd.core.frame.DataFrame()

        self.similarity = self.populateOwnHistory(self.ownHistory)

    def getDF(self, toShow:str = EDataframe.INTERACTIONDF.value ):
        if(toShow == EDataframe.INTERACTIONDF.value):
            return self.interactionDF 
        if(toShow == EDataframe.PRODUCTMAPPING.value):
            return self.productMapping
        if(toShow == EDataframe.INTERACTIONDF.value):
            return self.interactions

    def populateOwnHistory(self, dfOwn: pd.core.frame.DataFrame):
        self.ownHistory = dfOwn
    
    def populateRecommendation(self):
        """
        Make sure you have populated your history first
        """
        product_ids = list(self.ownHistory[ROW_PRODUCT_ID].unique())


        relevant_users_df = self.interactionDF[self.interactionDF[ROW_PRODUCT_ID].isin(product_ids)]
        relevant_users = list(relevant_users_df[ROW_USER].unique())
        
        # product_ids = list(self.ownHistory[ROW_PRODUCT_ID].unique())

        # This actually filters them out, you sould find the user ids first and then. 
        relevant_interaction = self.interactionDF[self.interactionDF[ROW_USER].isin(relevant_users)]
        # df_count_interaction = relevant_interaction.groupby(ROW_USER, as_index=False).count()
        interactions = pd.core.frame.DataFrame()


        # interactions = relevant_interaction[ROW_USER, ROW_PRODUCT_ID, ROW_SCORE]
        interactions[ROW_USER] = relevant_interaction[ROW_USER].astype(str)
        interactions[ROW_PRODUCT_ID] = relevant_interaction[ROW_PRODUCT_ID].astype(str)
        interactions[ROW_SCORE] = relevant_interaction[ROW_SCORE].astype(str)

        interactions[ROW_PRODUCT_INDEX] = interactions[ROW_PRODUCT_ID].astype('category').cat.codes
        interactions[ROW_USER_INDEX] = interactions[ROW_USER].astype('category').cat.codes
        interactions[ROW_SCORE] = pd.to_numeric(interactions[ROW_SCORE])

        print("Interactions: ")
        print(interactions.head())

        scores_mat_coo = coo_matrix((interactions[ROW_SCORE], (interactions[ROW_USER_INDEX], interactions[ROW_PRODUCT_INDEX])))
        ratings_mat = scores_mat_coo.tocsr()
        my_index = 0
        similarity = cosine_similarity(ratings_mat[my_index,:], ratings_mat).flatten()

        self.interactions = interactions
        self.similarity = similarity
        
    def getRecommendation(self, nAnalized = 0, frow=0):
        indices = np.argpartition(self.similarity, -nAnalized)[-nAnalized:]
        similar_users = self.interactions[self.interactions[ROW_USER_INDEX].isin(indices)].copy()
        similar_users = similar_users[similar_users[ROW_USER]!="-1"]

        product_recs = similar_users.groupby(ROW_PRODUCT_ID).score.agg(['count', 'mean'])
        product_recs = product_recs.sort_values("mean", ascending=False)
        # product_recs[ROW_PRODUCT_ID] = product_recs.index
        product_recs = product_recs.reset_index()
        
        print(product_recs)

        if(frow > 0):
            return product_recs[:frow]
        return product_recs

def get_google_img(query):
    """
    gets a link to the first google image search result
    :param query: search query string
    :result: url string to first result
    """
    url = 'https://www.google.com/search?hl=jp&q=' + query + '&btnG=Google+Search&tbs=0&safe=off&tbm=isch'
    headers={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}

    html = requests.get(url, headers=headers).text

    soup = BeautifulSoup(html, 'html.parser')
    image = soup.find("img",{"class":"yWs4tf"})
#     print(image)

    if not image:
        return 
    return image['src']

def getUser(filename):
    return filename.split('-')[0]
def getProduct(filename):
    return filename.split('-')[1]

class InteractionMapper():
    def __init__(self, SOURCE_FILE = "dist-data/2019-Oct.csv", nrows=-1):

        self.SOURCE_FILE = SOURCE_FILE
        
        if(nrows>0):
            df = pd.read_csv(SOURCE_FILE,  nrows=nrows)
        else:
            df = pd.read_csv(SOURCE_FILE)

        df['score'] = df['event_type'].apply(self.type_score)
        df['user_productid'] = df.apply(self.get_user_product_id, axis=1)
        self.df = df
        gb = df.groupby('user_productid', as_index=False)
        dfa = gb['score'].sum()
        dfa['user'] = dfa['user_productid'].apply(getUser)
        dfa['product_id'] = dfa['user_productid'].apply(getProduct)
        self.dfa = dfa
        self.products = pd.core.frame.DataFrame()

    def to_csv(self, INTERACTIONS_FILE = "dist-data/iterations.csv"):
        self.dfa.to_csv(INTERACTIONS_FILE)

    
    def type_score(self, event):
        event_map = {"view": 1, "cart": 3 , "purchase": 5}
        return event_map[event]

    def get_user_product_id(self, dfRow):
        return f"{dfRow['user_id']}-{dfRow['product_id']}"

    def populateUnique(self, TARGET_PRODUCTS_FILE="dist-data/products.csv" ,save=True):
        """
        Populates unique Products
        """
        df = self.df
        df[ROW_CATEGORY_CODE] = df[ROW_CATEGORY_CODE].astype(str)
        df[ROW_BRAND] = df[ROW_BRAND].astype(str) 
        
        df[ROW_NAME] = df.apply(create_name, axis=1)
        gb_count = df.groupby(ROW_PRODUCT_ID)[ROW_NAME].agg(["count"])
        gb_count.reset_index(ROW_PRODUCT_ID)
        products = df.drop_duplicates(ROW_NAME)
        products = products.merge(gb_count,how="left" , on=ROW_PRODUCT_ID)
        products.sort_values(ROW_COUNT, ascending=False)
        columns_to_drop = [ROW_EVENT, ROW_TIME, ROW_SESSION]
        products = products.drop(columns=columns_to_drop)
        products[ROW_NAME] = products[ROW_NAME].astype(str) 
        self.products = products

        if(save):
            products.to_csv(TARGET_PRODUCTS_FILE)




    def uploadImages(self, frows=-1, save_file = "data/images/", extension=".jpg", from_csv=""):
        """
        Upload images, from products
        """
        if(from_csv != ""):
            df = pd.read_csv(from_csv)
        else:
            df = self.df


        ERRORS = []
        if frows > 0:
            self.products = self.products.head(frows)
        for index, dfrow in df.iterrows():
            
            save_location = save_file+str(dfrow[ROW_PRODUCT_ID])+extension


            print(f"Search: {dfrow[ROW_NAME]}, saving at: {dfrow[ROW_PRODUCT_ID]}")
            try:
                imgq = dfrow[ROW_NAME]
                # print(f"Searching: {imgq}")
                imgsrc = get_google_img(imgq)
                response = requests.get(imgsrc)
                img = Image.open(BytesIO(response.content))
                img.save(save_location)
            except:
                print("Failed at saving: ", save_location)
                ERRORS.append(save_location)
        print("Errors: ", ERRORS)

    




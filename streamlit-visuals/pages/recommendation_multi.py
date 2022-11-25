import streamlit as st
import pandas as pd
import base64
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import seaborn as sns
import numpy as np
import plotly.express as px
from pathlib import Path
from plotly.subplots import make_subplots

from ecommerceEngine import EDataframe, RecommenderEngine
from typing import List

PRODUCTS_FILE = "data/products.csv"
INTERACTIONS_FILE = "data/interactions.csv"

ROW_NAME = "product_name"
ROW_COUNT = "count"
ROW_SCORE = "score"
ROW_PRODUCT_ID = "product_id"

from enum import Enum


class EEventType(Enum):
    VIEW = "view"
    CART = "cart"
    PURCHASE = "purchase"

event_map = {EEventType.VIEW.value: 1, EEventType.CART.value: 3 , EEventType.PURCHASE.value: 5}

st.write("Recommendation Engine")

@st.cache
def load_products():
    products_df = pd.read_csv(PRODUCTS_FILE)
    return products_df



df_products = load_products()
product_names = df_products

product_name = product_names.sort_values(ROW_COUNT, ascending=False)

df_interacted_products = pd.core.frame.DataFrame()

product_name

def getTopNames(df, rlen = 100, field_name = ROW_NAME):
    """
    get top (rlen) (field_names) from (df)
    """
    return df[field_name].iloc[:rlen]

def filterNoDots(arr, character = "."):
    """
    Filters so that array returned contains only strings with the (character)
    """
    return list(filter(lambda x:character in  x, arr))

def getDFDataFromField(df_products: pd.core.frame.DataFrame, field_query: str, field_search: str  = ROW_NAME, get_field:str = ""):
    """
    Selets row from (df_products) where (field_search) in (field_query)
    - [ ] If no field on (get_field) is provided, then returns the row as a whole, otherwise, it will return the data field specified to search
    """
    
    if(get_field != ""):
        select_cond = df_products[field_search] == field_query
        selected_field = df_products[select_cond].iloc[0][get_field]
        return selected_field
        

    select_cond = df_products[field_search] == field_query
    return df_products[select_cond]

def getDFFromFields(df_products: pd.core.frame.DataFrame, fields_query: List[str], field_search = ROW_NAME):
    """
    Selets row from (df_products) where (field_search) in (fields_query)

    """
    select_cond = df_products[field_search].isin(fields_query)
    return df_products[select_cond]



list_names = getTopNames(product_name)
list_names = filterNoDots(list_names)

# list_names

visited_list = st.multiselect("Choose items to visit", list_names)
cart_list = st.multiselect(f"Choose items to add to {EEventType.CART.value}", list_names)
purchased_list = st.multiselect(f"Choose items to {EEventType.PURCHASE.value}", list_names)

def appendToInteractedProducts( selected_list:List[str], df_interacted_products, message="", score = 1 ):
    """
    Appends to Selected Dataframe.
    - [x] If message available, also prints the selected information datafrme
    - [x] Appends to (df_interacted_products) the sleected products with the score assigned
    """
    
    df_selected_info = getDFFromFields(df_products=df_products, fields_query=selected_list, field_search= ROW_NAME)

    df_selected_interactions = df_selected_info[[ROW_PRODUCT_ID]]
    df_selected_interactions[ROW_SCORE] = score
    
    st.write(message)
    if(message!=""):
        df_selected_info

    df_interacted_products = df_interacted_products.append(df_selected_interactions)
    print("DF_interacted_products")
    print(df_interacted_products.head())
    return df_selected_interactions

if(len(visited_list) >0 ):
    df_v = appendToInteractedProducts(selected_list=visited_list, 
    df_interacted_products=df_interacted_products,
    score=event_map[EEventType.VIEW.value],
    message=f"{EEventType.VIEW.value} product details"
    )
    df_interacted_products = df_interacted_products.append(df_v)

if(len(cart_list) > 0 ):
    df_c = appendToInteractedProducts(selected_list=cart_list, 
    df_interacted_products=df_interacted_products,
    score=event_map[EEventType.CART.value],
    message=f"{EEventType.CART.value} product details"
    )
    df_interacted_products = df_interacted_products.append(df_c)

if(len(purchased_list) > 0 ):
    df_p = appendToInteractedProducts(selected_list=purchased_list, 
    df_interacted_products=df_interacted_products,
    score=event_map[EEventType.PURCHASE.value],
    message=f"{EEventType.PURCHASE.value} product details"
    )
    df_interacted_products = df_interacted_products.append(df_p)


if(len(df_interacted_products) > 0):
    st.write("Interacted Products")
    df_interacted_products

    
    






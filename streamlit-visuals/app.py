import streamlit as st
import pandas as pd
import base64
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import plotly.express as px

TOP_X = 20

hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            .viewerBadge_link__1S137 {visibility: hidden;}
            footer {visibility: hidden;}
            </style>
            """
st.markdown(hide_streamlit_style, unsafe_allow_html=True) 
st.title('Interactive Visualizations')

st.markdown("""
This app will retrieve data for playing with visualizations.
""")

st.sidebar.header('User Input Features')

# Web scraping of S&P 500 data
#
@st.cache
def load_data():

    # n = 1000  # every 100th line = 1% of the lines
    # df = pd.read_csv('data/2019-Oct.csv', header=0, skiprows=lambda i: i % n != 0)
    # # It should be able to pull data from it. 
    df = pd.read_csv('dist-data/2019-Oct-dist.csv',nrows = 1000000)
    df['event_time'] = pd.to_datetime(df['event_time'])
    
    df['year']= df['event_time'].dt.year
    df['month']= df['event_time'].dt.month
    df['day']= df['event_time'].dt.day
    
    return df

df = load_data()
# df.to_csv("data/2019-Oct-dist.csv", index=False)
# df["date"] = str(df["event_time"])[8:9]


# df["date"]
df
def getstr(x):
    return str(x)

st.write("### Top User activity.")

user_group = df.groupby("user_id")

usercount = user_group["user_id"].agg(["count"]).sort_values(by=["count"], ascending=False)


usercount = usercount[:TOP_X]
usercount["index"] = usercount.index
usercount["index"] = usercount["index"].apply(getstr)
fig = px.bar(usercount, x="index", y="count", color="index")
fig



def selectTopBrands(df, day=1, month=10, event_type = "purchase", top=10):
    condFilter = (df["day"] == day) & (df["month"] == month) & (df["event_type"] == event_type)
    df = df[condFilter]
    view_top_sellers = df.groupby('brand').brand.agg([len]).sort_values(by="len", ascending=False)
    view_top_sellers.reset_index(inplace=True)
    view_top_sellers.rename(columns={"len" : "# sales"}, inplace=True)
    return view_top_sellers.head(top)


fig = px.pie(selectTopBrands(df, day=1, event_type="view"), values='# sales', names='brand', title='Top 10 brands from Viewed')
fig

fig = px.pie(selectTopBrands(df, event_type="purchase"), values='# sales', names='brand', title='Top 10 brands from Purchased')
fig

# There is a porblem Hudson, all the first millon data are from 2019-11-01.which is why I believe I should straight create an API end point to run all this on its own. usign 
def gettopatyearcount(df, event_time_target):
    cond = df["event_time"] > event_time_target
    filtered = df[cond]
    user_group = filtered.groupby("user_id")
    usercount = user_group["user_id"].agg(["count"]).sort_values(by=["count"], ascending=False)
    usercount = usercount[:TOP_X]
    usercount["index"] = usercount.index
    usercount["index"] = usercount["index"].apply(getstr)


df = px.data.gapminder()
# print("Moving Charts",df)
# print(df["continent", "pop"])
fig = px.bar(df, x="continent", y="pop", color="continent",
  animation_frame="year", animation_group="country", range_y=[0,4000000000])
fig


# fig = px.bar(df, x="continent", y="pop", color="continent",
#   animation_frame="year", animation_group="country", range_y=[0,4000000000])
# fig

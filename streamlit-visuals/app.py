import streamlit as st
import pandas as pd
import base64
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import plotly.express as px
from pathlib import Path

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
    # df = pd.read_csv('dist-data/2019-Oct-dist.csv',nrows = 1000000)
    
    file = Path(__file__).parents[1] / 'streamlit-visuals/dist-data/2019-Oct-dist.csv'
    df = pd.read_csv(file, nrows = 1000000)
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




def getTopUsers(df, month=10, day=31, top=10):
    condFilter = (df["month"] <= month) & (df["day"] <= day)
    user_group = df[condFilter].groupby("user_id")
    usercount = user_group["user_id"].agg(["count"]).sort_values(by=["count"], ascending=False)


    usercount = usercount[:TOP_X]
    usercount["index"] = usercount.index
    usercount["index"] = usercount["index"].apply(getstr)
    return usercount.head(top)


def createAggUserTimeDataframe(df, cumulDF = pd.DataFrame(), end=31, month=10, top=10):
    dataFrameList = [cumulDF]
    for day in range(end):
        dayDF = getTopUsers(df, day=day, month=month,  top=top)
        dayDF["month"] = month
        dayDF["day"] = day
        dataFrameList.append(dayDF)
    return pd.concat(dataFrameList)

usercount= getTopUsers(df)
fig = px.bar(usercount, x="index", y="count", color="index")
fig



def selectTopBrands(df, day=31, month=10, event_type = "purchase", top=10):
    condFilter = (df["day"] <= day) & (df["month"] <= month) & (df["event_type"] == event_type)
    df = df[condFilter]
    view_top_sellers = df.groupby('brand').brand.agg([len]).sort_values(by="len", ascending=False)
    view_top_sellers.reset_index(inplace=True)
    view_top_sellers.rename(columns={"len" : "# sales"}, inplace=True)
    return view_top_sellers.head(top)



def createAggBrandTimeDataframe(df, cumulDF = pd.DataFrame(), end=31, month=10, event_type="purchase", top=10):
    dataFrameList = [cumulDF]
    for day in range(end):
        dayDF = selectTopBrands(df, day=day, month=month, event_type=event_type, top=top)
        dayDF["month"] = month
        dayDF["day"] = day
        dataFrameList.append(dayDF)
    return pd.concat(dataFrameList)


fig = px.pie(selectTopBrands(df, event_type="view"), values='# sales', names='brand', title='Top 10 brands from Viewed')
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



retDF = createAggBrandTimeDataframe(df, event_type="purchase")


fig = px.bar(retDF, x="brand", y="# sales", color="brand",
  animation_frame="day", animation_group="brand", range_y=[0,31])
# fig.update_layout(yaxis_range=[0, 300])
fig.update_yaxes(autorange=True)

fig.update_layout(barmode='stack', xaxis={'categoryorder':'total descending'})

st.write("## Best Performing Brands")

st.write("### Most Purchased Brands")
fig

viewDF = createAggBrandTimeDataframe(df, event_type="view")

fig = px.bar(viewDF, x="brand", y="# sales", color="brand",
  animation_frame="day", animation_group="brand", range_y=[0,31])
# fig.update_layout(yaxis_range=[0, 300])
fig.update_yaxes(autorange=True)

fig.update_layout(barmode='stack', xaxis={'categoryorder':'total descending'})

st.write("### Most Viewed Brands")
fig

userDF = createAggUserTimeDataframe(df)
fig = px.bar(userDF, x="index", y="count", color="index",
  animation_frame="day", animation_group="index", range_y=[0,31])
# fig.update_layout(yaxis_range=[0, 300])
fig.update_yaxes(autorange=True)

fig.update_layout(barmode='stack', xaxis={'categoryorder':'total descending'})


st.write("### MVP Customers over time")
fig




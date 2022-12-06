import streamlit as st
import pandas as pd
import base64
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import numpy as np
import plotly.express as px
from pathlib import Path
from plotly.subplots import make_subplots

TOP_X = 20
st.set_page_config(layout="wide")

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

#st.sidebar.header('User Input Features')

# Web scraping of S&P 500 data
#
@st.cache
def load_data():

    # n = 1000  # every 100th line = 1% of the lines
    # df = pd.read_csv('data/2019-Oct.csv', header=0, skiprows=lambda i: i % n != 0)
    # # It should be able to pull data from it. 
    # df = pd.read_csv('dist-data/2019-Oct-dist.csv',nrows = 1000000)
    
    file = Path(__file__).parent.parent.resolve() / 'dist-data/2019-Oct-dist.csv'
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
def getstr(x):
    return str(x)


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

top_user_activity, mvp_user = st.columns((2))

with top_user_activity:
    st.write("### Top User activity.")
    usercount= getTopUsers(df)
    fig = px.bar(usercount, x="index", y="count", color="index", width=600, height=500)
    fig.update_layout(autosize=True)
    fig

with mvp_user:
    userDF = createAggUserTimeDataframe(df)
    fig = px.bar(userDF, x="index", y="count", color="index",
    animation_frame="day", animation_group="index", range_y=[0,31], width=600, height=500)
    # fig.update_layout(yaxis_range=[0, 300])
    fig.update_yaxes(autorange=True)

    fig.update_layout(barmode='stack', xaxis={'categoryorder':'total descending'}, autosize=True,)

    st.write("### MVP Customers over time")
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

# There is a porblem Hudson, all the first millon data are from 2019-11-01.which is why I believe I should straight create an API end point to run all this on its own. usign 
def gettopatyearcount(df, event_time_target):
    cond = df["event_time"] > event_time_target
    filtered = df[cond]
    user_group = filtered.groupby("user_id")
    usercount = user_group["user_id"].agg(["count"]).sort_values(by=["count"], ascending=False)
    usercount = usercount[:TOP_X]
    usercount["index"] = usercount.index
    usercount["index"] = usercount["index"].apply(getstr)


st.write("## Best Performing Brands")
most_purchased_brands, most_viewed_brands = st.columns((2, 2))

with most_purchased_brands:
    retDF = createAggBrandTimeDataframe(df, event_type="purchase")

    fig = px.bar(retDF, x="brand", y="# sales", color="brand",
    animation_frame="day", animation_group="brand", range_y=[0,31], width=600, height=500)
    # fig.update_layout(yaxis_range=[0, 300])
    fig.update_yaxes(autorange=True)

    fig.update_layout(barmode='stack', xaxis={'categoryorder':'total descending'},autosize=True)

    st.write("### Most Purchased Brands")
    fig

with most_viewed_brands:
    viewDF = createAggBrandTimeDataframe(df, event_type="view")

    fig = px.bar(viewDF, x="brand", y="# sales", color="brand",
    animation_frame="day", animation_group="brand", range_y=[0,31], width=600, height=500)
    # fig.update_layout(yaxis_range=[0, 300])
    fig.update_yaxes(autorange=True)

    fig.update_layout(autosize=True, barmode='stack', xaxis={'categoryorder':'total descending'})

    st.write("### Most Viewed Brands")
    fig


def selectTopCategory(df, day=31, month=10, event_type = "purchase", top=10):
    condFilter = (df["day"] <= day) & (df["month"] <= month) & (df["event_type"] == event_type)
    df = df[condFilter]     
    view_top_category  = df.groupby('category_code').category_code.agg([len]).sort_values(by="len", ascending=False)
    view_top_category.reset_index(inplace=True)
    view_top_category.rename(columns={"len" : "# sales"}, inplace=True)
    return view_top_category.head(top)



# Top 10 brand that most customer purchased vs. view
st.subheader('Top 10 brand that most customer purchased vs. view')

df_brand = df
# Create subplots: use 'domain' type for Pie subplot
fig = make_subplots(column_widths=[500,500], rows=1, cols=2,
        subplot_titles = ["Purchased", "Viewed"], 
        specs=[[{'type':'domain'}, {'type':'domain'}]])

fig.add_trace(go.Pie(labels=selectTopBrands(df_brand,event_type='purchase')["brand"], values=selectTopBrands(df,event_type='purchase')["# sales"], name="Purchased"),
            1, 1)
fig.add_trace(go.Pie(labels=selectTopBrands(df_brand,event_type='view')["brand"], values=selectTopBrands(df,event_type= 'view')["# sales"], name="Viewed"),
            1, 2)

# Use `hole` to create a donut-like pie chart
fig.update_traces(hole=.1, hoverinfo="label+percent", textinfo='percent')

fig.update_layout(
    width=1000, height=500)

st.plotly_chart(fig)



# Top 10 brand that most customer purchased vs. view
st.subheader('Top 10 Category that most customer purchased vs. view')

# Create subplots: use 'domain' type for Pie subplot
fig = make_subplots(column_widths=[500,500], rows=1, cols=2,
        subplot_titles = ["Purchased", "Viewed"], 
        specs=[[{'type':'domain'}, {'type':'domain'}]])

fig.add_trace(go.Pie(labels=selectTopCategory(df,event_type='purchase'), values=selectTopCategory(df,event_type='purchase')["# sales"], name="Purchased"),
            1, 1)
fig.add_trace(go.Pie(labels=selectTopCategory(df,event_type='view'), values=selectTopCategory(df,event_type='view')["# sales"], name="Viewed"),
            1, 2)

# Use `hole` to create a donut-like pie chart
fig.update_traces(hole=.1, hoverinfo="label+percent", textinfo='percent')

fig.update_layout(
    width=1200, height=500)

st.plotly_chart(fig)

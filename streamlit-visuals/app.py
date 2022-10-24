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
    # It should be able to pull data from it. 
    df = pd.read_csv('data/2019-Nov.csv',nrows = 1000000)
    return df

df = load_data()
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



# gettopatyearcount(df, )


# No to get them over time what you need to do is to be able to: Get an item and then 
# You want to calculate the top 20 every day, and aggregate that into the dateframe


# There is a porblem Hudson, all the first millon data are from 2019-11-01.which is why I believe I should straight create an API end point to run all this on its own. usign 
def gettopatyearcount(df, event_time_target):
    cond = df["event_time"] > event_time_target
    filtered = df[cond]
    user_group = filtered.groupby("user_id")
    usercount = user_group["user_id"].agg(["count"]).sort_values(by=["count"], ascending=False)
    usercount = usercount[:TOP_X]
    usercount["index"] = usercount.index
    usercount["index"] = usercount["index"].apply(getstr)






# fig = px.bar(df, x="continent", y="pop", color="continent",
#   animation_frame="year", animation_group="country", range_y=[0,4000000000])
# fig


df = px.data.gapminder().query("year == 2007").query("continent == 'Europe'")
df.loc[df['pop'] < 2.e6, 'country'] = 'Other countries' # Represent only large countries
fig = px.pie(df, values='pop', names='country', title='Population of European continent')
fig


df = px.data.gapminder()
# print(df["continent", "pop"])
fig = px.bar(df, x="continent", y="pop", color="continent",
  animation_frame="year", animation_group="country", range_y=[0,4000000000])
fig
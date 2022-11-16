import streamlit as st
import pandas as pd
from PIL import Image
import plotly.express as px

st.set_page_config(layout="wide")

with open('style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

header = st.container()
dataset = st.container()
features = st.container()
image = Image.open('img/profile.jpg')


st.markdown(
    """"
    <style>
    .main {
        background-color: #F5F5F5;
        color: #e08882;
    }
    </style>
    """,
    unsafe_allow_html=True
)


with st.sidebar:
    st.subheader('About')
    st.markdown('Visualization & Analyze data about e-commerce customer behavior.')
    st.write("Data source: [Kaggle](https://www.kaggle.com/datasets/mkechinov/ecommerce-behavior-data-from-multi-category-store)")

with header:
    st.title('ECommerce_behavior')
    st.image(image)
    
with dataset:
    st.header('eCommerce behavior data from multi category store') 

    # Loading data
    df = pd.read_csv('../data/2019-Nov.csv', nrows=1000000, error_bad_lines=False)
    st.write(df.head(10))

    # Data Cleaning
    # Drop Duplicate Values and columns of no use
    # check for deplicate rows
    df.duplicated().sum()
    df = df.drop_duplicates()
    df = df.dropna()

    # Data type
    df_event_type = df['event_type'].value_counts().rename_axis('event_type_group').reset_index(name='counts')
    fig = px.pie(df_event_type, values='counts', names='event_type_group')
    fig.update_traces(
        textinfo='percent+label')
    st.plotly_chart(fig)
import streamlit as st
import pandas as pd
from PIL import Image
import plotly.express as px
from streamlit_echarts import st_echarts
import json

st.set_page_config(layout="wide", page_title="About Us")

st.markdown(""" <style> 
.font {font-size:50px ; font-family: 'Cooper Black'; color: #FF9633;} 
.des {color: #FF9633; text-align:justify; font-size:18px ;}
</style> """, unsafe_allow_html=True)

#image = Image.open('img/profile.jpg')

with st.sidebar:
    st.subheader('About our data')

st.markdown('<p class="font">ECommerce Behavior</p>',unsafe_allow_html=True)
header_image, header_description = st.columns((4, 1))

# with header_image:
#     st.image(image)

with header_description:
    st.markdown('<p class="des">This data was collected by Open CDP project. This file contains behavior data for 7 months (from October 2019 to April 2020) from a large multi-category online store. We only work on the first 10 million rows of the 2019-Nov csv file.. </p>',unsafe_allow_html=True)

# Loading data
df = pd.read_csv('2019-Nov-dist.csv', nrows=1000000, error_bad_lines=False)
    
expander = st.expander("eCommerce behavior data from multi category store")
with expander:
    st.write(f"Data source: [Kaggle](https://www.kaggle.com/datasets/mkechinov/ecommerce-behavior-data-from-multi-category-store)")
    st.write(df.head(20))

    # Data Cleaning
    # Drop Duplicate Values and columns of no use
    # check for deplicate rows
    df.duplicated().sum()
    df = df.drop_duplicates()
    df = df.dropna()


col1, col2=st.columns(2)

df_event_type = df['event_type'].value_counts().rename_axis('event_type_group').reset_index(name='counts')
jsn_string = df_event_type.to_json(orient='values')
jsn_list = json.loads(jsn_string)

with col1:
    df_event_type = df['event_type'].value_counts().rename_axis('event_type_group').reset_index(name='counts')
    option = {
    "tooltip": {
        "trigger": 'item'
    },
    "legend": {
        "top": '5%',
        "left": 'center'
    },
    "series": [
        {
            "name": 'event type',
            "type": 'pie',
            "radius": ['40%', '75%'],
            "avoidLabelOverlap": "false",
            "itemStyle": {
                "borderRadius": "10",
                "borderColor": '#fff',
                "borderWidth": "2"
            },
            "label": {
                "show": "false",
                "position": 'center'
            },
            "emphasis": {
                "label": {
                    "show": "true",
                    "fontSize": '20',
                    "fontWeight": 'bold'
                }
            },
            "labelLine": {
                "show": "false"
            },
            "data": [
                {"value": 596558, "name": 'View'},
                {"value": 12867, "name": 'Cart'},
                {"value": 12736, "name": 'Purchase'}
            ]
        }
    ]
};

    st_echarts(options=option, key="1")

with col2:
    option = {
        "tooltip": {
            "formatter": '{a} <br/>{b} : {c}%'
        },
        "series": [{
            "name": 'process',
            "type": 'gauge',
            "startAngle": 180,
            "endAngle": 0,
            "progress": {
                "show": "true"
            },
            "radius":'100%', 

            "itemStyle": {
                "color": '#FF9633',
                "shadowColor": 'rgba(0,138,255,0.45)',
                "shadowBlur": 10,
                "shadowOffsetX": 2,
                "shadowOffsetY": 2,
                "radius": '55%',
            },
            "progress": {
                "show": "true",
                "roundCap": "true",
                "width": 15
            },
            "pointer": {
                "length": '60%',
                "width": 8,
                "offsetCenter": [0, '5%']
            },
            "detail": {
                "valueAnimation": "true",
                "formatter": '{value}%',
                "backgroundColor": '#FF9633',
                "borderColor": '#eab676',
                "borderWidth": 4,
                "width": '60%',
                "lineHeight": 20,
                "height": 20,
                "borderRadius": 188,
                "offsetCenter": [0, '40%'],
                "valueAnimation": "true",
            },
            "data": [{
                "value": 95.9,
                "name": 'View'
            }]
        }]
    };

    st_echarts(options=option, key="")




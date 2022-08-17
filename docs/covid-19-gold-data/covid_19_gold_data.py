import os
from flask import Blueprint, render_template

covid_19_gold_data = Blueprint('covid_19_gold_data',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

covid_19_gold_data.display_name = "covid data"
covid_19_gold_data.published = False


@covid_19_gold_data.route('/')
def _covid_19_gold_data():
    images = os.listdir(os.getcwd() + "/cxyz/exhibits/covid_19_gold_data/img")
    images = ["img/" + i for i in images]
    return render_template('covid-19-gold-data.html', images=images)

from flask import Blueprint, render_template

julius = Blueprint('julius',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

julius.display_name = "julius"
julius.published = False


@julius.route('/')
def _julius():
    return render_template('julius.html')

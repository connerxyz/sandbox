from flask import Blueprint, render_template

redspine = Blueprint('redspine',
                      __name__,
                     template_folder='./',
                     static_folder='./',
                     static_url_path='/')

redspine.display_name = "redspine"
redspine.published = False


@redspine.route('/')
def _redspine():
    return render_template('redspine.html')

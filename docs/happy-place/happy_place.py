from flask import Blueprint, render_template

happy_place = Blueprint('happy_place',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

happy_place.display_name = "happy place"
happy_place.published = False


@happy_place.route('/')
def _happy_place():
    return render_template('happy-place.html')

from flask import Blueprint, render_template

lines = Blueprint('lines',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

lines.display_name = "lines"
lines.published = False


@lines.route('/')
def _lines():
    return render_template('lines.html')

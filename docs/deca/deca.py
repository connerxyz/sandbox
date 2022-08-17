from flask import Blueprint, render_template

deca = Blueprint('deca',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

deca.display_name = "deca"
deca.published = False


@deca.route('/')
def _deca():
    return render_template('deca.html')

from flask import Blueprint, render_template

hello_labs = Blueprint('hello_labs',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

hello_labs.display_name = "hello labs"
hello_labs.published = False


@hello_labs.route('/')
def _hello_labs():
    return render_template('hello-labs.html')

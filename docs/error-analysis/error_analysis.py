from flask import Blueprint, render_template

error_analysis = Blueprint('error_analysis',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

error_analysis.display_name = "error analysis"
error_analysis.published = False


@error_analysis.route('/')
def _error_analysis():
    return render_template('error-analysis.html')

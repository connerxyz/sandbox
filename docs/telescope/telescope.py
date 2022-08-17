from flask import Blueprint, render_template

telescope = Blueprint('telescope',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

telescope.display_name = "telescope"
telescope.published = False


@telescope.route('/')
def _telescope():
    return render_template('telescope.html')

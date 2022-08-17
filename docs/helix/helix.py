from flask import Blueprint, render_template

helix = Blueprint('helix',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

helix.display_name = "helix"
helix.published = False


@helix.route('/')
def _helix():
    return render_template('helix.html')

import os

from flask import Blueprint, render_template

codex_ux_and_style_guide = Blueprint('codex_ux_and_style_guide',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                                static_url_path='/')

codex_ux_and_style_guide.display_name = "codex"
codex_ux_and_style_guide.published = False


@codex_ux_and_style_guide.route('/')
def _codex_ux_and_style_guide():
    images = os.listdir(os.getcwd() + "/cxyz/exhibits/codex_ux_and_style_guide/img")
    images = ["img/" + i for i in images]
    return render_template('codex-ux-and-style-guide.html', images=images)

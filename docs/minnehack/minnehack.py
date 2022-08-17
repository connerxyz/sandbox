import os

from flask import Blueprint, render_template, url_for

minnehack = Blueprint('minnehack',
                    __name__,
                    template_folder='./',
                    static_folder='./',
                    static_url_path='/')


@minnehack.route('/')
def _minnehack():
    return render_template('minnehack.html')

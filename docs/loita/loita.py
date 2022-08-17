from flask import Blueprint, render_template
import os

loita = Blueprint('loita',
                  __name__,
                  template_folder='./',
                  static_folder='./',
                   static_url_path='/')

loita.display_name = "lost in the abyss"


@loita.route('/')
def _loita():
    images = os.listdir(os.getcwd() + "/cxyz/exhibits/loita/img")
    images = ["img/" + i for i in images if not i.startswith(".")]
    return render_template('loita.html', images=images)


# @loita.route('/audio')
# def audio_test():
#     files = os.listdir("cxyz/core/static/audio/multiple/")
#     files = ['audio/multiple/' + i for i in files]
#     return render_template('audio-test.html', files=files)


# @loita.route('/audio2')
# def audio_test_2():
#     files = os.listdir("cxyz/core/static/audio/multiple/")
#     files = ['audio/multiple/' + i for i in files]
#     return render_template('audio-test-2.html', files=files)

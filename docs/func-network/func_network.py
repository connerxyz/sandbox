from flask import Blueprint, render_template

func_network = Blueprint('func_network',
                                __name__,
                                template_folder='./',
                                static_folder='./',
                   static_url_path='/')

func_network.display_name = "func.network"
func_network.published = False


@func_network.route('/')
def _func_network():
    return render_template('func-network.html')

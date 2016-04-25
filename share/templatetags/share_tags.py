try:
    import urlparse
except:
    from urllib import parse as urlparse
from django.template import Library
from django.utils.http import urlquote
from django.conf import settings
from share.settings import *
from django.template.loader import render_to_string

register = Library()


@register.simple_tag
def share_css():
    return "<link href='" + settings.STATIC_URL \
        + "css/share.css' type='text/css' rel='stylesheet' />"


@register.simple_tag
def share_js():
    return "<script src='" + settings.STATIC_URL \
        + "js/share.js' type='text/javascript'></script>"


@register.inclusion_tag('share/links.html', takes_context=True)
def share(context, *args, **kwargs):
    providers = kwargs.get('providers', None)
    if providers:
        providers = {'main': providers.split()}
    else:
        providers = SHARE_PROVIDERS
    url = context['request'].build_absolute_uri(kwargs.get('url', None))

    return context.update({
        'providers': providers,
        'url': url
    })

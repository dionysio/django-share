### Django Share

Django Share allows users to share a web page in various social networks like bookmarking services, social blogs and similar.
Most providers included don't use widgets but are based on corresponding APIs so you can customize the look and feel of every provider.

Installation
==============

Add to `INSTALLED_APPS`:

    'share',

Include URL patterns if you want to use email sharing:

    (r'^share/', include('share.urls')),

Load the template tags where needed:

    {% load share_tags %}

Settings
==============

`SHARE_PROVIDERS`

A tuple containing providers.

Defaults to:

    {'main': ('facebook', 'twitter', 'pinterest', 'googleplus',),
    'more': ('email', 'print', ),}

Template tags
==============

    {% share_css %}
    {% share_js %}

Needed CSS and JS files for the sharing services.

    {% share %}

Renders a listing for all enabled providers.

It's also possible to limit the list to a selection of providers or override the URL (both arguments are optional):

    {% share providers='facebook twitter' url=item.get_absolute_url %}

Templates
=========

The default listing/widget is in `share/links.html`

All providers are available at `share/providers/[provider].html`

ex: `share/providers/facebook.html`

You can create a custom provider by adding it to the `SHARE_PROVIDERS` setting and creating a template for it at: `share/providers/[provider].html`

Included providers
=========

    facebook
    twitter
    pinterest
    googleplus

custom providers

    email
    print


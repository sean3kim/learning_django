from rest_framework.exceptions import NotAuthenticated, AuthenticationFailed, APIException
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError

# needed to update settings.py so that django knows to use this exception handler

def custom_exception_handler(exc, context):

    # DRF default exception handler to get standard response
    response = exception_handler(exc, context)

    # so IntegrityError is a django db error and not by default handled by DRF
    #   i think this is why the response is None, unlike the DRF handled errors below in if response is not None
    # exc captures what is sent with the raised exception from where it is raised
    if isinstance(exc, IntegrityError):
        if 'Duplicate entry' in str(exc):
            return Response('item already in cart, update quantity in the cart', status=status.HTTP_400_BAD_REQUEST)

    # adds status code to default error response
    if response is not None:
        response.data['status_code'] = response.status_code

        # how to send a response that will trigger catch in client??? but also remove the red error flag in console??
        #   regular Response will remove the red error in console but won't trigger catch
        if isinstance(exc, NotAuthenticated):
            # triggers catch in client, red error in console
            response.data['type'] = 'NotAuthenticated'
        elif isinstance(exc, AuthenticationFailed):
            # doesn't trigger catch in client, no red error in console
            response.data['type'] = 'AuthenticationFailed'
            return Response({"error": "AuthenticationFailed"})
        elif isinstance(exc, IntegrityError):
            print('integrityerror found')
            return Response({'error': 'IntegrityError'}, status=status.HTTP_400_BAD_REQUEST)

    return response
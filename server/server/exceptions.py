from rest_framework.exceptions import NotAuthenticated, AuthenticationFailed, APIException
from rest_framework.views import exception_handler
from rest_framework.response import Response

# needed to update settings.py so that django knows to use this exception handler

def custom_exception_handler(exc, context):

    # DRF default exception handler to get standard response
    response = exception_handler(exc, context)
    # print("standard exception response", response.data)

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

    return response
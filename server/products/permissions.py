from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        print("request user", request.user.is_staff)
        print("request method", request.method)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user.is_staff
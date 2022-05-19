from rest_framework import permissions

class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        
        return obj.customer == request.user

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # if read operation, allow access
        if request.method in permissions.SAFE_METHODS:
            return True

        # if user is owner, allow access
        if obj.customer == request.user:
            return True
        
        return False
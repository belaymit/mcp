# Fix for NEX-123: Adjusted login button CSS
screen_width = 1024

def apply_mobile_styles(button_element):
    """
    Apply mobile-specific styles to the login button
    Fixes alignment issue on screens smaller than 480px
    """
    global screen_width
    if screen_width < 480:
        button_element.style.marginLeft = 'auto'
        button_element.style.marginRight = 'auto'
        button_element.style.display = 'block'
        button_element.style.width = '90%'
        button_element.style.maxWidth = '300px'
    
    return button_element

def get_screen_width():
    """Get current screen width for responsive design"""
    return window.innerWidth if hasattr(window, 'innerWidth') else 1024

# CSS styles for mobile login button
mobile_login_styles = {
    'margin': '0 auto',
    'display': 'block',
    'text-align': 'center',
    'padding': '12px 24px',
    'border-radius': '4px',
    'font-size': '16px'
} 
import uuid


def generate_form_id() -> str:
    """Generate a random alphanumeric form ID."""
    chars = str(uuid.uuid4())[:23]
    return chars

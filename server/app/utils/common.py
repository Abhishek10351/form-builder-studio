import nanoid
def generate_random_id() -> str:
    """Generate a random alphanumeric form ID."""
    return nanoid.generate(size=12)

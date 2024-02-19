from __future__ import annotations

import uuid


def unique_file_upload(instance, filename: str) -> str:  # noqa: ANN001, PLR0917
    unique_filename = f'{instance.id}_{uuid.uuid4()}_{filename}'
    return f'activity_images/{unique_filename}'

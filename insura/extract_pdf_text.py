import sys
from pathlib import Path
p = Path('devtrails_Rulebook.pdf')
text = ''
try:
    import PyPDF2
    with open(p, 'rb') as f:
        r = PyPDF2.PdfReader(f)
        for page in r.pages:
            text += page.extract_text() or ''
except Exception:
    try:
        import fitz
        doc = fitz.open(str(p))
        for page in doc:
            text += page.get_text()
    except Exception as e2:
        print('ERROR', e2)
        sys.exit(1)
print(text[:20000])

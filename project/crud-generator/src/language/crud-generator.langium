grammar CrudGenerator

entry Model:
    entities+=Entity*;

Entity:
    'entity' name=ID '{'
    fields+=Field*
    '}';

Field:
  name=ID ':' type=('STRING' | 'INT') ';';

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
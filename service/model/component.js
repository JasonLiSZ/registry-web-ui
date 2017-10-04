class ComponentItem {
  id;
  key;
  name;
  description;

  constructor(id, key, name, description){
    this.id = id;
    this.key = key;
    this.name = name;
    this.description = description
  }
}

module.exports = ComponentItem;

function unflatten(data) {
  let result = {}
  for (let i in data) {
    let keys = i.split('.')
    keys.reduce(function (r, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
    }, result)
  }
  return result
}

function objectToFormData(obj, form, namespace) {

  var fd = form || new FormData();
  var formKey;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {

      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

        objectToFormData(obj[property], fd, property);

      } else {

        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }

    }
  }

  return fd;

};

const orderType = {
  INDIVIDUAL_MEAL: 'Individual Meal',
  MEAL_PLAN: 'Meal Plan'
};

const deliveryStatusType = {
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered'
};

const getDeliveryStatusColor = (status) => {
  switch (status) {
    case deliveryStatusType.OUT_FOR_DELIVERY:
      return '#ffa500';
    case deliveryStatusType.DELIVERED:
      return '#20a22a';
    default:
      return '#909090';
  }
};

module.exports = {
  unflatten,
  orderType,
  objectToFormData,
  deliveryStatusType,
  getDeliveryStatusColor
}

import faker from 'faker';

// NOTE: To mimix API call
export function generateRandomData() {
  return new Promise(function (resolve, reject) {
    const jsonArr = [];

    const customerNames = generateRandomNames();

    customerNames.map((customerName) => {
      const id = faker.random.number();
      const randomNumber = faker.random.number({'min': 3, 'max': 10});
      const todayDate = new Date();
  
      for(let i = 0; i < randomNumber; i++) {
        const customerData = {
          id: faker.random.number(),
          custId: id,
          name: customerName,
          date: faker.date.between(new Date(todayDate.getFullYear(), todayDate.getMonth() - 2, todayDate.getDay()), todayDate),
          amount: faker.random.number({'min': 30, 'max': 1000})
        }
  
        jsonArr.push(customerData);
      }
    });
    

    resolve(jsonArr);
  });
}

function generateRandomNames() {
  const customerNames = [];

  const randomNumber = faker.random.number({'min': 3, 'max': 10});

  for(let i = 0; i < randomNumber; i++) {
    const name = faker.name.firstName() + ' ' + faker.name.lastName();

    customerNames.push(name);
  }

  return customerNames;
}
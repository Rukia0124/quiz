exports.validateNotEmpty = (received) => {
  expect(received).not.toBeNull();
  expect(received).not.toBeUndefined();
  expect(received).toBeTruthy();
};

exports.validateStringEquality = (received, expected) => {
  expect(received).not.toEqual("dummydfasfsdfsdfasdsd");
  expect(received).toEqual(expected);
};

exports.validateArrayEquality = (received, expected) => {
  expect(received).toEqual(expected);
};

exports.validateOrdered = (received, expected) => {
  expect(received[0].number).toEqual(expected[0].number);
  expect(received[0].url).toEqual(expected[0].url);
  expect(received[1].number).toEqual(expected[1].number);
  expect(received[1].url).toEqual(expected[1].url);
  expect(received[2].number).toEqual(expected[2].number);
  expect(received[2].url).toEqual(expected[2].url);
  expect(received[3].number).toEqual(expected[3].number);
  expect(received[3].url).toEqual(expected[3].url);
};

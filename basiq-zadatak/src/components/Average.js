import React from "react";

function Average({ transactions }) {
  function calculateAverage(array) {
    const transactionMap = new Map();
    array.forEach((element) => {
      const type = element[3];
      const amount = -element[2];

      if (transactionMap.has(type)) {
        const { count, sum } = transactionMap.get(type);
        transactionMap.set(type, {
          count: count + 1,
          sum: sum + amount,
        });
      } else {
        transactionMap.set(type, {
          count: 1,
          sum: amount,
        });
      }
    });

    const averages = [];

    transactionMap.forEach((value, key) => {
      const average = value.sum / value.count;
      averages.push([key, average]);
    });

    return averages;
  }

  function getTitle(array) {
    const categories = [];
    array.forEach((item) => {
      const transaction = transactions.find(
        (element) => element[3] === item[0]
      );
      categories.push(transaction[0]);
    });
    return categories;
  }
  const averages = calculateAverage(transactions);
  const categories = getTitle(averages);

  return (
    <div>
      <h2 className="my-5">Average amount by category</h2>
      {averages.map((item, index) => {
        return (
          <div className="mt-4 fs shadow-sm p-3 rounded" key={index}>
            <div>
              <strong>
                {categories[index]} ({item[0]}):
              </strong>
            </div>
            <div>{item[1] > 0 ? item[1] : Math.abs(item[1])}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Average;

export const formatDate = (dateObj) => new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(dateObj);

export const toQueryString = (data) => {
  const params = new URLSearchParams();
  let checkboxArray = [];

  Object.entries(data).forEach(([key, value]) => {
    if (key === "date" && value instanceof Date) {
      params.append("date", formatDate(value));
      params.append("day", value.getDay());
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      if ("value" in value) {
        if (value.value) params.append(key, value.value);
      }
      else {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue) checkboxArray.push(subKey);
        });
      }
    } else if (value) {
      params.append(key, value);
    }
  });

  if (checkboxArray.length) {
    params.append("other", checkboxArray.join(","));
  }

  return params.toString();
}

export const otherRequireFieldNameQuery = {
  "夜間急診": "hasEmergency",
  "特寵診療": "hasExoticPetTreat",
  "24HR營業": "isAllDay",
  "現場預約": "hasWalkInAppt",
  "到府診療": "HomeVisit",
  "電話預約": "hasCallBooking",
  "汽車停車": "MCParking",
  "機車停車": "CarParking",
  "停車空間": "hasParking",
}

export const toApiQueryString = (data) => {
  const params = new URLSearchParams();
  const findField = otherRequireFieldNameQuery

  Object.entries(data).forEach(([key, value]) => {
    if (key === "area") {
      params.append("district", value);
    } else if (key === "other") {
      value.split(",").forEach(o => {
        const field = findField[o]
        if (field) params.append("req", field);
      })
    } else if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
}

export const computedTo = (path, location) =>
  path === "/search"
    ? location.pathname === "/"
      ? "/#find-vet"
      : location.pathname === "/search/result"
        ? location
        : path
    : path;
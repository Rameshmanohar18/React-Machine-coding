# Accordion Component Approach:

---

## Data Preparation

- **Maintain a list** of accordion items inside a separate file like `data.js`
  - Each item should contain:
    - `id`
    - `title`
    - `description`

---

## Inside `App.jsx`

- **Render** multiple Accordion components using `.map()`.
- **Maintain two states**:
  - `allowMultipleOpen` (default: `true`)
  - `activeAccordions` (a `Set` tracking currently opened accordions)

### 🧠 Core Logic:

```javascript
// Toggling the allowMultipleOpen boolean
const handleCheckboxToggle = () => setAllowMultipleOpen((prev) => !prev);
```

---

## Inside `Accordion.jsx`

- Accordion component consists of:
  - `title` tag
  - `button`
  - `description` (info)

### Accordion Button Click Handler:

```javascript
const handleClick = () => {
  toggleAccordion(id); // id passed from props
};
```

### 🔎 Showing or Hiding Info:

```javascript
<div className={`accordion-content ${isActive ? 'open' : ''}`}>
  <p>{info}</p>
</div>
```

🔵 **`isActive`** is determined by:

```javascript
isActive={activeAccordions.has(item.id)}
```

> **✅ 80% work is completed here!** Remaining is the real PRO LOGIC! 🚀

---

## 🎯 Handling Scenarios

### Scenario 1

- **Checkbox Selected** ➡️ Multiple Accordions can stay open → **Easy**

### Scenario 2

- **Checkbox Not Selected** ➡️ Only one Accordion can stay open → **Harder**
- On toggling:
  - Close all others
  - Open only the clicked one

---

## Final Core Logic for `toggleAccordion`

### Button onClick triggers:

```javascript
const toggleAccordion = (id) => {
  setActiveAccordions((prev) => {
    const updatedActiveAccordions = new Set(prev); // Step 1

    if (updatedActiveAccordions.has(id)) {
      // Step 2
      updatedActiveAccordions.delete(id); // Step 3
    } else {
      if (!allowMultipleOpen) {
        updatedActiveAccordions.clear(); // Step 5 (single open allowed)
      }
      updatedActiveAccordions.add(id); // Step 5 (multiple open allowed)
    }

    return updatedActiveAccordions; // Step 6
  });
};
```

---

## Full Step-by-Step Breakdown

| Step       | Description                                  | Code Example                                                           |
| :--------- | :------------------------------------------- | :--------------------------------------------------------------------- |
| **Step 1** | Copy previous state into a new `Set`         | `const updatedActiveAccordions = new Set(prev);`                       |
| **Step 2** | Check if `id` exists                         | `updatedActiveAccordions.has(id)`                                      |
| **Step 3** | If true, delete it                           | `updatedActiveAccordions.delete(id)`                                   |
| **Step 4** | If false, check `allowMultipleOpen`          | `if (!allowMultipleOpen)`                                              |
| **Step 5** | Clear if not allowed multiple, else add `id` | `updatedActiveAccordions.clear()` or `updatedActiveAccordions.add(id)` |
| **Step 6** | Return the updated `Set`                     | `return updatedActiveAccordions;`                                      |

---

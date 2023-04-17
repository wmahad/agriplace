# Agriplace - Frontend Assignment

## Introduction

This assignment is supposed to be a conversational piece, so don't push it too far, and it doesn't have to do perfect.
Try not to spend more than four hours on it. We would like to focus on the code and not the style, so keep it simple
and minimal, even using standard html elements would be fine. If you feel more comfortable using a UI library, feel free
to do so.
We use MUI in our project, but don't feel obliged to use it if you are not familiar with it, we'd rather that you spend
your time thinking and coding than reading documentation.

## The assignment

The assignment is to create a simple web application that has an admin panel and a public facing page. The admin panel
consists of two pages
that are a basic CRUD, one for managing fruits and one for managing vegetables. The public facing page is a simple page
that lists all the fruits and vegetables.
There is already a mockup of a backend as RTK Query endpoints, you can find it in the `mocks` folder, the endpoints
have a fake delay so please also use loading states where necessary. The mockup backend just saves the changes on
localstorage,
and there is also a function to reset the data to the initial state. There is also already a router and the basic layout
of
the app.

### Admin panel

The admin panel should have two pages, one for managing fruits and one for managing vegetables. The pages should have a
list/table of the relevant products, and you should be able to create, update and delete them - if you don't use a
UI framework, don't bother creating a modal if you think it would take too much of your time. There should also be a
search field that filters the list of products by looking in the title, description and tags.

#### Creating and Editing

When creating a product, there should be a form with the following fields:

- Title
- Description
- Tags - as checkboxes ( fruits should show the fruit tags and vegetables should show the vegetable tags )

When editing a product, the form should be pre-filled with the current values of the product, it should have the same
fields as creating, including an "archived" checkbox which would hide the product from the public page.

### Public facing page

The public facing page consists of four sections:

- A list of all the fruits and vegetables
- A section to view the selected products
- A section that shows the cart's contents
- A section that shows the last 5 products that the user has viewed

#### List of products

The list should include all the non-archived fruits and vegetables along with a search field that filters the
products based on name, a list of tags that you can toggle to filter the results. The list should show the
name of the product and the tags as chips with their respective colors (just choose a color for each tag).
Clicking on a product should show the product in the product view.

#### Product view

The product view should have its own route, and should snow the name, description and tags of the product, along with a
button that adds that product to the users cart.

#### Cart

The cart should be just a list of the products that the user has added to the cart, along with a button that removes
that product from the cart. The cart contents should be saved in a redux state.

#### Recently viewed

The recently viewed section should show a list of the last 5 products that the user has viewed, clicking on a product in
the list should bring that product in the product view. The recently viewed products should be saved in a redux state.



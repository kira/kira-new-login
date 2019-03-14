# Homework

## Instructions

1. Please answer the following question without using any third party resources.

1. Treat this problem as a library. No UI or file/console input is expected or required.
 
1. **Commit often and use many commits. Don't squash into a single commit.**

1. Please submit via publicly accessible repo so that we can review your commits.

1. Note: If you are using a compiled language please include instructions on how to build your code.

## Getting Started

1. Fork this repo

1. Create a new file for your code

1. Make an initial commit

1. Start coding, **committing frequently**

## Completing
1. Push your code to your forked repo and send a link to the hiring manager.

Note: If it is a privately forked repo invite the hiring manager to the private repo.

## The Problem

PricePackager is responsible for taking existing products and repackaging them for sale at electronic stores.

Companies contact PricePackager, explain what the item is, and PricePackager returns the marked up value of item.

* Without exception, there is a flat markup on all products of 5%
* Some items need work done on them by humans, so for each person that needs to work on the item, there is an additional markup of 1.2%

Markups are also added depending on the types of item:

* If they are pharmaceutical, there is a 7.5% markup
* If they are food, there is a 13% markup
* If they are electronic, there is a 2% markup
* Everything else has no additional markup.

The flat markup is calculated first and then all other markups are calculated on top of the base price plus the flat markup.

### Example 1:

    Input:  1299.99, 3 people, food
    
    Base Price:     1299.99
    Flat Markup:    5% = 64.9995
    Subtotal:       1364.9895
    Persons Markup: 3 * 1.2% = 3.6% = 49.139622
    Type markup:    13% = 177.448635
    Total:          1591.577757

    Output: 1591.58

### Example 2:

    Input:  5432.00, 1 person, pharmaceutical

    Base Price:     5432
    Flat Markup:    5% = 271.6
    Subtotal:       5703.6
    Persons Markup: 1 * 1.2% = 4.8% = 68.4432
    Type markup:    7.5% = 427.77
    Total:          6199.8132

    Output: 6199.81

### Example 3:

    Input:  12456.95, 4 people, books

    Base Price:     12456.95
    Flat Markup:    5% = 622.8475
    Subtotal:       13079.7975
    Persons Markup: 4 * 1.2% = 4.8% = 627.83028
    Type markup:    0
    Total:          13707.62778

    Output: 13707.63
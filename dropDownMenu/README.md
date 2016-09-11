#DropDownMenuSelection
A jQuery plugin used to select dropdown menu items.


#usage

```javascript
// initialization
$().dropDownSelection(options);

//get selected value
$().dropDownSelection("getValue");

//reset plugin
$().dropDownSelection("setValue", new_options);


//you can see the effect by passing a empty object like
 $().dropDownSelection({});

//standard options
    DropDownSelection.defaults = {
        title: "前端技能列表",
        content: [{text: 'javascript', value: 'js'}, {text: 'css', value: 'c'},
            {text: 'html5', value: 'h5'}, {text: 'jQuery', value: 'frame'}],
        parse: function (data) {
            return {
                text: data.text,
                value: data.value
            };
        },
        result: []
        //important: store the selected values in the array result.
    };
```

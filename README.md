# Mini page builder
A mini page builder implemented using drag &amp; drop functionality from scratch
## UI
![image](https://github.com/jshristi22/mini-page-builder/assets/82311180/c5d6f427-d77e-49a0-95fd-e3906fee9be3)
![image](https://github.com/jshristi22/mini-page-builder/assets/82311180/8307c9df-38d2-433f-a9a1-7dde6168b135)
![image](https://github.com/jshristi22/mini-page-builder/assets/82311180/c34aa861-d528-4aa1-81e9-884b37325f79)
![image](https://github.com/jshristi22/mini-page-builder/assets/82311180/d735377c-0f54-4897-bd7e-bf9e2f233ca7)
![image](https://github.com/jshristi22/mini-page-builder/assets/82311180/f13f881b-524d-41c0-ab16-320da8cecbcf)
![image](https://github.com/jshristi22/mini-page-builder/assets/82311180/d280072e-b9ce-4e87-a97a-155c94b167e7)


## Documentation

The mini page builder as the name suggest let's the user build their own webpage. The user can drag the elements from the sidebar and place it on the canvas as they like. Internally, the combination of onDragStart() and onDrop() event is being used to drag elements from the sidebar and drop them on the canvas. 

#### Working: 
 * Draggable attribute: internally component uses it to be able to drag.
 * onDragStart(): This event is triggered when user starts dragging the element from the sidebar.
 * onDrop(): This event is triggered when the element is dropped on the canvas. The event is used to verify whether the component is dropped at the target element(here canvas), then it internally retrieves the x and y coordinates of the dropped component and uses it.
 * The x and y coordinates extracted from onDrop event are used to position the element on the canvas using SASS.
 * Each element along with it's properties (coordinates, font-size etc.) is stored in a local list (using useState() hook), which is kept in sync with localStorage as well.
 * Whenever the page is refreshed, the local data is synced with the data present in local storage.
 * Whenever an element is clicked, a listener is setup on `delete` & `enter` key presses, which then triggers respective actions: 
    * on `delete` keypress: the element is deleted from and the list.
    * on `enter` keypress: a dialog box is opened where the user can update the selected component's properties.
    In both of the above cases the canvas re-renders, which results in updated UI.




## Instruction to run the application

Step 1. Clone the repository

```git clone https://github.com/jshristi22/mini-page-builder.git```

Step 2: Changes directory

```cd mini-page-builder```

Step 3: Install all dependencies

```npm install```

Step 4: Run the application on localhost

```npm run dev```

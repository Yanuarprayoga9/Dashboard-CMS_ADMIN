const onChange = (open: boolean) => {
    if (!open) {
      //onchange jka open false maka onclose
      console.log("i clicked")
    }

    console.log("not clicked")
  };


  onChange(false)


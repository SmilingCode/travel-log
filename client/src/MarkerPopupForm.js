import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControlLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";

import { createLogEntries } from "./api";

// import DatePicker from './DatePicker'
// import Select from 'react-select';
// import { getAllRatings } from './api';
// import * as R from 'ramda';

const MarkerPopupForm = ({ addEntryLocation, onClose }) => {
  const [postError, setPostError] = React.useState("");
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = async (data) => {
    console.log("data: ", data);
    try {
      data.latitude = addEntryLocation.latitude;
      data.longitude = addEntryLocation.longitude;
      await createLogEntries(data).then((res) => console.log(res));
      onClose();
    } catch (errors) {
      console.log(errors);
      setPostError(errors);
    }
  };

  // const [selectRatingValue, setSelectRatingValue] = React.useState('')
  // const handleSelection = (selectedValue) => {
  //   setValue("rating", selectedValue.value)
  //   setSelectRatingValue(selectedValue)
  // }

  // const optionsSort = R.sortWith([R.ascend(R.prop("value"))])

  // const [ratings, setRatings] = React.useState([]);

  // React.useEffect(() => {
  //   (async () => {
  //     const allRatings = await getAllRatings();
  //     console.log("allRatings", allRatings)

  //     for(let i in allRatings) {
  //       allRatings[i].value = parseInt(allRatings[i].value)
  //     }
  //     console.log("newAllRatings: ", allRatings)

  //     setRatings(optionsSort(allRatings))
  //     console.log("ratings", optionsSort(allRatings))
  //   })()

  // }, [])

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setValue("rating", e.target.value);
  };

  React.useEffect(() => {
    register({ name: "rating" });
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {postError && <h3 color="#f05305"> {postError}</h3>}
      <Box>
        <Box>
          <FormLabel>Title</FormLabel>
        </Box>
        <Box className="inputTextField">
          <TextField
            label="title"
            name="title"
            inputRef={register({ required: true, maxLength: 10 })}
            helperText={
              errors.title
                ? errors.title.type === "maxLength"
                  ? "No more than 10 characters please!"
                  : "Title is required!"
                : null
            }
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Box>
          <FormLabel>Description: </FormLabel>
        </Box>
        <Box className="inputTextField">
          <TextField
            label="description"
            name="description"
            inputRef={register}
            variant="outlined"
            multiline
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Box>
          <FormLabel>Comment: </FormLabel>
        </Box>
        <Box className="inputTextField">
          <TextField
            label="comments"
            name="comments"
            inputRef={register({ maxLength: 200 })}
            helperText={
              errors.comments ? "No more than 200 characters please!" : null
            }
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
      {/* <Select
        value={selectRatingValue}
        options={ratings}
        onChange={handleSelection}
        isClearable={true}
        name="rating"
        inputRef={register}
      /> */}
      <Box>
        <FormLabel>Rating: </FormLabel>
        <RadioGroup
          row
          aria-label="rating"
          name="rating"
          defaultValue="1"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="1"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="2"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="3"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="4"
          />
          <FormControlLabel
            value="5"
            control={<Radio color="primary" />}
            label="5"
          />
          <FormControlLabel
            value="6"
            control={<Radio color="primary" />}
            label="6"
          />
          <FormControlLabel
            value="7"
            control={<Radio color="primary" />}
            label="7"
          />
          <FormControlLabel
            value="8"
            control={<Radio color="primary" />}
            label="8"
          />
          <FormControlLabel
            value="9"
            control={<Radio color="primary" />}
            label="9"
          />
          <FormControlLabel
            value="10"
            control={<Radio color="primary" />}
            label="10"
          />
        </RadioGroup>
      </Box>
      <Box>
        <Box>
          <FormLabel>Image: </FormLabel>
        </Box>
        <Box className="inputTextField">
          <TextField
            label="image"
            name="image"
            inputRef={register}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Box>
          <FormLabel>Visit Date: </FormLabel>
        </Box>
        <Box className="inputTextField">
          <input
            type="date"
            placeholder="visitDate"
            name="visitDate"
            ref={register({ required: true })}
          />
        </Box>
      </Box>
      {/* <DatePicker /> */}
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

export default MarkerPopupForm;

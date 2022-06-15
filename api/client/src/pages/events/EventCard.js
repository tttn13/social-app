import "./eventCard.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

import { formatAMPM } from "../../utils/utils";

export default function EventCard(item) {
  const formatDate = (date) => {
    const d = new Date(date).toString().split(" ").splice(1, 3);
    return d[0] + " " + d[1] + ", " + d[2];
  };
  const formatHrs = (timeString) => {
    const hr = timeString.slice(0, 2);
    const mns = timeString.slice(3, 5);
    return formatAMPM(hr, mns);
  };
  if (item.item) {
    const imageUrl =
      item.item.images == null
        ? "https://cdn-icons-png.flaticon.com/512/747/747376.png"
        : item.item.images[0].url;
    return (
      <a
        className="eventCardContainer"
        href={item.item.url}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card
          sx={{ width: 300, height: 280 }}
        >
          <div className="cardMediaContainer"> 
          <CardMedia
            component="img"
            height="150"
            image={imageUrl}
            alt="media card"
            className="cardMediaImg"
          />
          <div className="cardMediaMiddle"></div>
          </div>
          <CardContent>
            <Typography gutterBottom variant="caption" component="div">
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {formatDate(item.item.dates.start.localDate)}{" · "}
                {formatHrs(item.item.dates.start.localTime)}
              </Typography>
        
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontWeight: "medium", fontSize: 16 }}
              color="text.primary"
            >
              {item.item.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "medium", fontSize: 16 }}
              color="text.secondary"
            >
              {item.item._embedded?.venues?.length == 1
                ? item.item._embedded?.venues[0].name
                : item.item._embedded?.venues[0].name + "and more locations"}
            </Typography>
          </CardContent>
        </Card>
      </a>
    );
  } else {
    return <></>;
  }
}

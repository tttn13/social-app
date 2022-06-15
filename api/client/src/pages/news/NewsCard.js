import "./newsCard.css";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import ReactTimeAgo from "react-time-ago";

export default function NewsCard(item) {
  if ("item" in item && "media:content" in item["item"]) {
    if ("@_url" in item["item"]["media:content"]) {
      return (
        <a
          className="newsContainer"
          href={item["item"]["link"]}
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card
            sx={{
              width: 300,
              height: 280,
            }}
          >
            <div className="newsCardMediaContainer">
              <CardMedia
                className="newsCardMediaImg"
                component="img"
                height="150"
                image={item["item"]["media:content"]["@_url"]}
                alt="media card"
              />
              <div className="newsCardMediaMiddle"></div>
            </div>

            <CardContent>
              <Typography gutterBottom variant="caption" component="div">
                New York Times ·{" "}
                <ReactTimeAgo
                  className="postDate"
                  date={new Date(item["item"]["pubDate"])}
                  locale="en-US"
                  formatter={{ suffix: "ago" }}
                />{" "}
                ·{" "}
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  Top Story
                </Typography>
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", fontSize: 16 }}
                color="text.secondary"
              >
                {item["item"]["title"]}
              </Typography>
            </CardContent>
          </Card>
        </a>
      );
    }
  } else {
    return <></>;
  }
}

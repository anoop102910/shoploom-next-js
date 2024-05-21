"use client";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { useReviews } from "@/lib/data";
import { Avatar } from "@/components/shared/avatar";
import Error from "@/components/shared/error";
import { Divide } from "lucide-react";

function Review({ product }) {
  const { reviews, isLoading, error } = useReviews(product.id);
  if (error) return <Error />;

  return (
    <div>
      <div className="flex justify-between items-center mt-10 ">
        <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">Add Review</Button>
          </DialogTrigger>
          <ReviewCard product={product} />
        </Dialog>
      </div>
      <div className="flex justify-between bg-slate-200 p-2 rounded-md mt-4">
        <div>Rating snapshot</div>
      </div>
      <div className="flex gap-20 ">
        <div className="flex justify-between items-start mt-4">
          <ReviewStats />
        </div>
        <div className="border rounded-md mt-6 w-full">
          <h2 className="font-medium text-lg p-4">Rating and reviews</h2>
          {isLoading ? (
            <div />
          ) : (
            <div>
              {reviews.map((review, index) => (
                <>
                  <ReviewCardItem key={review.id} review={review} />
                  <hr />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ReviewCard = React.forwardRef(({ product, className, title, children, ...props }, ref) => {
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
    productId: product.id,
  });

  const handleReviewSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/reviews", formData);
      tst.success("Review created");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  return (
    <DialogContent className="w-[700px]">
      <DialogHeader>
        <DialogTitle>Add a review</DialogTitle>
        <DialogDescription>
          Your review will help us better our product and improve it for you
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-1">
        <Label htmlFor="rating" className="text-right mb-5">
          Rating
        </Label>
        <Select
          className="w-full"
          onValueChange={value => setFormData({ ...formData, rating: value })}
        >
          <SelectTrigger className="col-span-3 border-slate-600">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 stars</SelectItem>
            <SelectItem value="4">4 stars</SelectItem>
            <SelectItem value="3">3 stars</SelectItem>
            <SelectItem value="2">2 stars</SelectItem>
            <SelectItem value="1">1 star</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="comment" className="text-right mb-5">
          Comment
        </Label>
        <Textarea
          placeholder="Enter your comment"
          value={formData.comment}
          name="comment"
          onChange={e => setFormData({ ...formData, comment: e.target.value })}
        />
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleReviewSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
});

ReviewCard.displayName = "ReviewCard";

const ReviewStats = React.forwardRef(({ className, title, children, ...props }, ref) => {
  const reviewStats = [
    { rating: 5, progressValue: 70, count: 213 },
    { rating: 4, progressValue: 64, count: 113 },
    { rating: 3, progressValue: 45, count: 23 },
    { rating: 2, progressValue: 32, count: 10 },
    { rating: 1, progressValue: 20, count: 2 },
  ];
  return (
    <>
      <div className="space-y-2">
        {reviewStats.map((review, index) => (
          <div key={index} className="flex gap-1 items-center">
            <span>{review.rating}</span>
            <Icon className="text-yellow-500" icon="iconamoon:star" />
            <Progress className="w-60 bg-slate-300 text-green-50" value={review.progressValue} />
            <span>{review.count}</span>
          </div>
        ))}
      </div>
    </>
  );
});

ReviewStats.displayName = "ReviewStats";

const ReviewCardItem = React.forwardRef(({ review }, ref) => {
  return (
    <div key={review.id} className="p-4">
      <div className="space-x-2 flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Avatar image={review.user.image} name={review.user.name} />
          <span className="text-slate-600">{review.user.name}</span>
        </div>
        <div className="bg-green-400 text-white px-2 py-[0.5rem] text-xs rounded flex gap-1 items-center">
          <span>{review.rating}</span>
          <Icon icon="iconamoon:star" />
        </div>
      </div>
      <div className="mt-3 ml-1">
        <p>{review.comment}</p>
      </div>
    </div>
  );
});

ReviewCardItem.displayName = "ReviewCardItem";

export default Review;

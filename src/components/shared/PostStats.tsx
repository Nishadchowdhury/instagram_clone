import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite"
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

    const likesList = post?.likes.map((user: Models.Document) => user.$id)

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSaving } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeleting } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation(); // it will stop any further, instead it will let to click the specific button with handler func.
        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);

        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            newLikes.push(userId);
        }
        setLikes(newLikes);
        likePost({ postId: post.$id, likesArray: newLikes });
    };

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id)

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser])


    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();


        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
        } else {
            setIsSaved(true);
            savePost({ postId: post?.$id || '', userId })
        }
    };

    function calculateLikeString(likes: number) {
        return likes > 1 ? likes : "";
    }

    return (
        <div className="flex justify-between items-center z-20 " >
            <div className="flex gap-2 mr-5 ">
                <img src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} alt="like"
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium" > {calculateLikeString(likes?.length || 0)}</p>
            </div>


            <div className="flex gap-2 ">
                {isSaving || isDeleting ? <Loader /> : <img src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleSavePost}
                    className="cursor-pointer"
                />
                }
            </div>
        </div>
    )
}
export default PostStats
"use client"
import { Box, Button, Text, Tooltip } from '@chakra-ui/react';

const Comment = ({ comment }) => {
  return (
    <Box p={2} mt={4}>
      <Text fontSize="md" fontWeight="bold">{comment.data.author}</Text>
      <Text fontSize="sm" mt={4}>{comment.data.body}</Text>

      {comment.data.replies && (
        <Box ml={4} mt={4} borderLeft="2px" borderColor="brand.100">
          {comment.data.replies.data?.children.map(reply => {
            if (reply.kind === "t1") {
              return <Comment key={reply.data.id} comment={reply} />;
            } else {
              return (
                <Tooltip key={reply.data.id} hasArrow label='Disabled in this version' shouldWrapChildren mt='3'>
                  <Button size="sm" key={reply.data.id} variant="link" ml={2} disabled>{reply.data.count} More</Button>
                </Tooltip>
              );
            }
          })}
        </Box>
      )}
    </Box>
  );
};

export default Comment;

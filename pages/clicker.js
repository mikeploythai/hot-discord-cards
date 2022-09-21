import { Flex, Image, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function ClickerGame() {
    const [points, setPoints] = useState(0);
    const toast = useToast();
    const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
    const toastW = useBreakpointValue({ base: "100%", md: "320px" });
    const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

    useEffect(() => {
        getProfileData();
    });

    async function getCurrentUser() {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        if (!session?.user) throw new Error("User not logged in");
        return session.user;
    }

    async function getProfileData() {
        try {
            const user = await getCurrentUser();

            let { data, error } = await supabase
                .from("profiles")
                .select("points")
                .eq("id", user.id)
                .maybeSingle();
            if (error) throw error;

            if (data) {

                setPoints(data.points);
            }
        } catch (error) {
            toast({
                title: "Error!",
                description: error.message,
                status: "error",
                position: toastPos,
                containerStyle: {
                    w: toastW,
                    p: toastP,
                },
                isClosable: true,
            });
        }
    }
    var score = points;

    function addToScore(amount) {
        score = score + amount;
        document.getElementById("score").innerHTML = score;
    }

    return (
        <Flex>
            <Text>Score: <span id="score">0</span></Text>
            <Image src="https://cdn.discordapp.com/attachments/945912566000001045/1019300849685631046/image0.jpg" height="256px"
                width="256px" onClick={() => addToScore(1)} />
        </Flex>
    );
}

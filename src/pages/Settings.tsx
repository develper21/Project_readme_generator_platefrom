import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ display_name: "", bio: "", github_username: "", avatar_url: "" });
  const [issues, setIssues] = useState<any[]>([]);
  const [newIssue, setNewIssue] = useState({ title: "", description: "", priority: "medium" });

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [pRes, iRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("user_issues").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (pRes.data) setProfile({ display_name: pRes.data.display_name || "", bio: pRes.data.bio || "", github_username: pRes.data.github_username || "", avatar_url: pRes.data.avatar_url || "" });
      if (iRes.data) setIssues(iRes.data);
    };
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(profile).eq("user_id", user.id);
    setSaving(false);
    if (error) toast.error(error.message, { position: "bottom-center" });
    else toast.success("Profile updated!", { position: "bottom-center" });
  };

  const handleSubmitIssue = async () => {
    if (!user || !newIssue.title.trim()) return;
    const { data, error } = await supabase.from("user_issues").insert({ ...newIssue, user_id: user.id }).select().single();
    if (error) toast.error(error.message, { position: "bottom-center" });
    else {
      setIssues([data, ...issues]);
      setNewIssue({ title: "", description: "", priority: "medium" });
      toast.success("Issue submitted!", { position: "bottom-center" });
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-4 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl text-foreground mb-6">Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="clay-sm mb-6 w-full sm:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="clay p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">Display Name</label>
                <Input value={profile.display_name} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} className="clay-inset border-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">Bio</label>
                <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="clay-inset border-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">GitHub Username</label>
                <Input value={profile.github_username} onChange={(e) => setProfile({ ...profile, github_username: e.target.value })} className="clay-inset border-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">Avatar URL</label>
                <Input value={profile.avatar_url} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} className="clay-inset border-none" />
              </div>
              <Button variant="hero" onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="issues">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="clay p-6 space-y-4">
                <h3 className="font-display font-bold text-foreground">Report an Issue</h3>
                <Input placeholder="Issue title" value={newIssue.title} onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })} className="clay-inset border-none" />
                <Textarea placeholder="Describe the issue..." value={newIssue.description} onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })} className="clay-inset border-none" />
                <div className="flex gap-2">
                  {["low", "medium", "high"].map((p) => (
                    <Button key={p} variant={newIssue.priority === p ? "default" : "ghost"} size="sm" onClick={() => setNewIssue({ ...newIssue, priority: p })} className="capitalize">{p}</Button>
                  ))}
                </div>
                <Button variant="hero" onClick={handleSubmitIssue} className="gap-2"><Plus className="h-4 w-4" />Submit Issue</Button>
              </div>

              {issues.map((issue) => (
                <div key={issue.id} className="clay p-4 flex items-start gap-3">
                  <AlertCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${issue.status === "open" ? "text-accent-foreground" : "text-muted-foreground"}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-foreground text-sm">{issue.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${issue.status === "open" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{issue.status}</span>
                      <span className="text-xs text-muted-foreground capitalize">{issue.priority}</span>
                    </div>
                    {issue.description && <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{new Date(issue.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

const NotificationsTab = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setNotifications(data);
    });
  }, [userId]);

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      {notifications.length === 0 && (
        <div className="clay p-8 text-center text-muted-foreground">No notifications yet</div>
      )}
      {notifications.map((n) => (
        <div key={n.id} className={`clay p-4 cursor-pointer transition-opacity ${n.read ? "opacity-60" : ""}`} onClick={() => !n.read && markRead(n.id)}>
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-sm text-foreground">{n.title}</h4>
            {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
          <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString()}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default Settings;

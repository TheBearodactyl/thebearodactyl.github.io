--- check if a cli flag was used
--- @param name string
--- @return boolean used
local function has_flag(name)
	for i, v in ipairs(arg) do
		if v == name then
			return true
		end
	end

	return false
end

--- @param name string the flag to get the value of
--- @return any val the value passed to the flag
local function get_flag(name)
	if has_flag(name) then
		for i = 1, #arg do
			if arg[i] == name then
				return arg[i + 1]
			end
		end
	end

	return nil
end

--- wait for x milliseconds
--- @param ms number
local function wait(ms)
	local start = os.clock()
	local seconds = ms / 1000
	while os.clock() - start < seconds do
	end
end

local times_succeeded = 0
local times_failed = 0

io.write("build status for \27[36m'script.ts'\27[0m\n")

--- @param succeeded integer
local function print_status(succeeded)
	if succeeded == 1 then
		times_succeeded = times_succeeded + 1
	elseif succeeded == 0 then
		times_failed = times_failed + 1
	end

	io.write(
		"\27[A\r\27[32msucceeded\27[0m "
			.. times_succeeded
			.. " times\n\27[31mfailed\27[0m "
			.. times_failed
			.. " times"
	)
end

local function build_script()
	local _, _, code = os.execute("tsc script.ts --lib es2024,dom > nul")
	print_status(code ~= 2 and 1 or 0)
	wait(get_flag("--delay") or 3000)
end

print("")
while true do
	build_script()
end
